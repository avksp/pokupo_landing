<?php
namespace Pokupo\JsGeneratorBundle\Service;


class FileGenerator
{
    public static function generateJs($path, $files, $filename){
        $resultFile = $path . '/../web/widgets/' . $filename;

        if(!file_exists($resultFile)) {
            $ac = new \Assetic\Asset\AssetCollection($files,
                array(
                    new \Assetic\Filter\Yui\JsCompressorFilter($path . '/Resources/java/yuicompressor-2.4.8.jar')
                ));
            $compressJS = $ac->dump();

            file_put_contents($resultFile, $compressJS);
        }

        return $filename;
    }

    public static function generateCss($path, $files, $filename){
        $resultFile = $path . '/../web/widgets/' . $filename;
        if(!file_exists($resultFile)) {
            $ac = new \Assetic\Asset\AssetCollection($files,
                array(
                    new \Assetic\Filter\Yui\CssCompressorFilter($path . '/Resources/java/yuicompressor-2.4.8.jar')
                ));
            $compressJS = $ac->dump();

            file_put_contents($resultFile, $compressJS);
        }

        return $filename;
    }

    public static function generateHtml($path, $filename, $content){
        $resultFile = $path . '/../web/widgets/' . $filename;
        file_put_contents($resultFile, $content);

        return $path;
    }
}