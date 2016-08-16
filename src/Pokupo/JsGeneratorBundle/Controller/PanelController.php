<?php

namespace Pokupo\JsGeneratorBundle\Controller;

use Pokupo\JsGeneratorBundle\Service\ThemeList;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Pokupo\JsGeneratorBundle\Service\FileGenerator;
use Pokupo\JsGeneratorBundle\Service\AssetsCollection;

class PanelController extends Controller
{
    public function indexAction($shopId){
        $themeList = ThemeList::getList();

        return $this->render('PokupoJsGeneratorBundle:Panel:index.html.twig', array(
            'themeList' => $themeList,
            'shopId' => $shopId
        ));
    }

    public function createAction(){
        $path = $this->container->getParameter('kernel.root_dir');
        $data = $this->get('request')->request->get('data');
        $parameters = $this->container->getParameter('pokupo');
        $generator = $this->get('js_generator');
        $prefix = md5(serialize($data));

        $assets = new AssetsCollection($this->container, $parameters, $data);

        $themeCssFiles = $assets->getCss();
        $filenameCss = 'pokupo.theme.'.$prefix.'.min.css';
        FileGenerator::generateCss($path, $themeCssFiles, $filenameCss);

        $widgetFiles = $assets->getJs();
        $filenameJs = 'pokupo.widgets.'.$prefix.'.min.js';
        FileGenerator::generateJs($path, $widgetFiles, $filenameJs);

        $assets->clearTemp();

        $tmpl = $generator->GetTmpl($data);

        $js = $generator->GetResultJsCode($filenameJs, $filenameCss, $data['shopId']);
        $div = $generator->GetResultDivCode($tmpl);
        $html = $generator->GetResultHtmlCode($filenameJs, $filenameCss, $div, $data['shopId']);

        $filename = 'pokupo.widgets.'.$prefix.'.html';
        FileGenerator::generateHtml($path, $filename, $html);

        return new JsonResponse(
            array('result' => array(
                'js' => $js,
                'div' => $div,
                'html' => $html,
                'prefix' => $prefix
            ))
        );
    }

    public function tmplValidateAction(){
        $tmpl = $this->get('request')->request->get('tmpl');

        $file = @file_get_contents($tmpl);
        if($file)
            return new JsonResponse(
                array('result' => 'ok')
            );
        else
            return new JsonResponse(
                array('result' => 'error')
            );
    }

    public function getHtmlAction(){
        $path = $this->container->getParameter('kernel.root_dir');
        $prefix = $this->get('request')->query->get('prefix');

        $filenameHtml = 'pokupo.widgets.'.$prefix.'.html';
        $absolutePath = $path . '/../web/widgets/' . $filenameHtml;

        if (file_exists($absolutePath)) {
            // сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
            // если этого не сделать файл будет читаться в память полностью!
            if (ob_get_level()) {
                ob_end_clean();
            }
            // заставляем браузер показать окно сохранения файла
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename=shop.html');
            header('Content-Transfer-Encoding: binary');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($absolutePath));
            // читаем файл и отправляем его пользователю
            if ($fd = fopen($absolutePath, 'rb')) {
                while (!feof($fd)) {
                    print fread($fd, 1024);
                }
                fclose($fd);
            }
            exit;
        }

        exit;
    }
}
