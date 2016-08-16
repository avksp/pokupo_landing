<?php 
namespace Pokupo\JsGeneratorBundle\Service;

class AssetsCollection{


    public function __construct($container, $parameters, $data) {
        $this->container = $container;
        $this->parameters = $parameters;
        $this->data = $data;
        $this->path = $this->container->getParameter('kernel.root_dir');
        $this->generator = $this->container->get('js_generator');

        $temp = md5(microtime());
        $this->tempFile = $this->path . '/../web/widgets/settings.' . $temp .'.js';
        $this->tempThemeFile = $this->path . '/../web/widgets/theme.' . $temp . '.js';
        $this->widgetFiles = array();
    }

    public function getCss(){
        $themeCssFiles = array();
        if(isset($this->parameters['themes'][$this->data['theme']['id']])) {
            foreach ($this->parameters['themes'][$this->data['theme']['id']]['css'] as $one) {
                $themeCssFiles[] = new \Assetic\Asset\FileAsset($this->parameters['pathTmpl'] . $one);
            }
        }

        return $themeCssFiles;
    }

    public function getCore(){
        foreach($this->parameters['core'] as $one){
            $this->widgetFiles[] = new \Assetic\Asset\FileAsset($this->parameters['path'] . $one);
        }
    }

    public function getThemeJs(){
        if(isset($this->parameters['themes'][$this->data['theme']['id']])) {
            foreach ($this->parameters['themes'][$this->data['theme']['id']]['js']['core'] as $one) {
                $this->widgetFiles[] = new \Assetic\Asset\FileAsset($this->parameters['path'] . $one);
            }
            foreach ($this->data as $key => $widget) {
                if (isset($this->data[$key]['active']) && $this->data[$key]['active'] == 'true' && isset($this->parameters['themes'][$this->data['theme']['id']]['js']['widgets'][$key])) {
                    foreach ($this->parameters['themes'][$this->data['theme']['id']]['js']['widgets'][$key] as $one) {
                        if (file_exists($this->parameters['path'] . $one))
                            $this->widgetFiles[] = new \Assetic\Asset\FileAsset($this->parameters['path'] . $one);
                    }
                }
            }

            $code = $this->container->get('templating')->render('PokupoJsGeneratorBundle:Generator:theme/default.html.twig', array('data' => $this->data));

            file_put_contents($this->tempThemeFile, $code);
            $this->widgetFiles[] = new \Assetic\Asset\FileAsset($this->tempThemeFile);
        }
    }

    public function getWidgets(){
        foreach($this->data as $key => $widget){
            $functionName = 'Get' . ucfirst($key) . 'Widget';
            if(method_exists($this->generator, $functionName) && $this->data[$key]['active'] == 'true'){
                foreach($this->parameters['widgets'][$key] as $oneFile){
                    $this->widgetFiles[] = new \Assetic\Asset\FileAsset($this->parameters['path'] . $oneFile);
                }
            }
        }
    }

    public function getSettings(){
        $settings = array();
        $settings['core'] = $this->generator->GetCoreSettings($this->data);
        foreach($this->data as $key => $widget){
            $functionName = 'Get' . ucfirst($key) . 'Widget';
            if(method_exists($this->generator, $functionName) && $this->data[$key]['active'] == 'true'){
                $code = call_user_func_array(array($this->generator, $functionName), array($this->data, $key));
                $settings[$key] = $code;
            }
        }

        file_put_contents($this->tempFile, implode(';', $settings));

        return new \Assetic\Asset\FileAsset($this->tempFile);
    }

    public function getJs(){
        $this->getCore();
        $this->getWidgets();
        $this->getThemeJs();

        $settingsFiles = $this->getSettings();

        array_unshift($this->widgetFiles, $settingsFiles);

        return $this->widgetFiles;
    }

    public function clearTemp(){
        if(file_exists($this->tempFile))
            unlink($this->tempFile);
        if(file_exists($this->tempThemeFile))
            unlink($this->tempThemeFile);
    }
}