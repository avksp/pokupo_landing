<?php
namespace Pokupo\JsGeneratorBundle\Service;


class JsGenerator
{
    /**
     * @var ContainerInterface
     */
    protected $container;
    protected $templating;
    protected $widgetHost;
    protected $request;

    /**
     * Constructor
     *
     * @param ContainerInterface $container
     */
    public function __construct($container) {
        $this->container = $container;
        $this->templating = $this->container->get('templating');
        $settings = $this->container->getParameter('pokupo');
        $this->widgetHost = $settings['hostWidget'];
        $this->request = $container->get('request');
    }

    public function GetResultJsCode($js, $css, $shopId){
        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:_resultJs.html.twig', array(
            'js' => $js,
            'css' => $css,
            'shopId' => $shopId,
            'token' => sha1($shopId),
            'host' => $this->widgetHost
        ));
        return $code;
    }

    public function GetResultDivCode($tmpl){
        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:_resultDiv.html.twig', array(
            'tmpl' => $tmpl
        ));
        return $code;
    }

    public function GetResultHtmlCode($js, $css, $tmpl, $shopId){
        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:_resultHtml.html.twig', array(
            'js' => $js,
            'css' => $css,
            'shopId' => $shopId,
            'token' => sha1($shopId),
            'host' => $this->widgetHost,
            'tmpl' => $tmpl
        ));
        return $code;
    }

    public function GetTmpl($data){
        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:_tmpl.html.twig', array(
            'data' => $data
        ));
        return $code;
    }

    public function GetCoreSettings($data){
        $theme = ThemeList::getById($data['theme']['id']);
        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_core.html.twig', array(
            'shopId' => $data['shopId'],
            'theme' => $theme->getAlias(),
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetContentWidget($data, $key){
        $idBlock = $data[$key]['block']['containerId'];
        $idContent = $data[$key]['content']['containerId'];
        $result = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetContent());

        $settings = array(
            'showCart' => $data[$key]['showCart'],
            'block' => $this->ClearValue($result['block']),
            'content' => $this->ClearValue($result['content'])
        );

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_content.html.twig', array(
            'idBlock' => $idBlock,
            'idContent' => $idContent,
            'data' => $settings,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetBreadcrumbsWidget($data, $key)
    {
        $id = $data[$key]['containerId'];

        $settings = @array_diff($data[$key], DefaultSettings::GetBreadcrumbs());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_breadcrumbs.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetCatalogWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = @array_diff($data[$key], DefaultSettings::GetCatalog());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_catalog.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetCartInfoWidget($data, $key)
    {
        $id = $data[$key]['containerId'];
        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetCart());

        $result = $this->ClearValue($settings);
        $show = array();
        if (isset($result['showTitle']))
            $show['title'] = $result['showTitle'];
        if (isset($result['show']['count']))
            $show['count'] = $result['show']['count'];
        if (isset($result['show']['baseCost']))
            $show['baseCost'] = $result['show']['baseCost'];
        if (isset($result['show']['finalCost']))
            $show['finalCost'] = $result['show']['finalCost'];
        if (isset($result['show']['fullInfo']))
            $show['fullInfo'] = $result['show']['fullInfo'];
        if (count($show) > 0)
            $result['show'] = $show;

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_cartInfo.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetCartGoodsWidget($data, $key)
    {
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetCartGoods());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_cartGoods.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetCartGoodsCabinetWidget($data, $key)
    {
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetCartGoodsCabinet());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_cartGoodsCabinet.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetSearchWidget($data, $key)
    {
        $id = $data[$key]['containerId'];

        $settings = array_diff($data[$key], DefaultSettings::GetSearch());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_search.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetAdvancedSearchWidget($data, $key)
    {
        $idForm = $data[$key]['form']['containerId'];
        $idResult = $data[$key]['result']['containerId'];
        $result = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetAdvancedSearch());
        $settings = array(
            'form' => $this->ClearValue($result['form']),
            'result' => $this->ClearValue($result['result'])
        );

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_advancedSearch.html.twig', array(
            'idForm' => $idForm,
            'idResult' => $idResult,
            'data' => $settings,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetAuthenticationWidget($data, $key)
    {
        $id = $data[$key]['containerId'];

        $settings = @array_diff($data[$key], DefaultSettings::GetAuthentication());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_authentication.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetFavoritesWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetFavorites());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_favorites.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetMenuCabinetWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetMenuPersonalCabinet());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_menuCabinet.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetMessageWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetMessage());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_message.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetOrderWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetOrder());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_order.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetOrderListWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetOrderList());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_orderList.html.twig', array(
            'id' => $id,
            'data' => $result,
            'showMenu' => $data['menuCabinet']['active'] == 'true' ? true : false,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetPaymentWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetButtonPayment());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_payment.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetProfileWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetProfile());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_profile.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetRegistrationWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetRegistration());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_registration.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetRegistrationSellerWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetRegistrationSeller());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_registrationSeller.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetUserInfoWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetUserInfo());
        $result = $this->ClearValue($settings);

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_userInfo.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetGoodsWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetGoods());
        $result = $this->ClearValue($settings);

        $show = array();
        if (isset($result['show']['selectionCount']))
            $show[] = 'selectionCount';
        if (isset($result['show']['addToCart']))
            $show[] = 'addToCart';
        if (isset($result['show']['buy']))
            $show[] = 'buy';
        if (isset($result['show']['gallery']))
            $show[] = 'gallery';
        if (isset($result['show']['shipping']))
            $show[] = 'shipping';
        if (isset($result['show']['opinion']))
            $show[] = 'opinion';
        if ($data['favorites']['active'] == 'true')
            $show[] = 'favorites';
        if (count($show) > 0)
            $result['show'] = $show;

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_goods.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public function GetShopInfoWidget($data, $key){
        $id = $data[$key]['containerId'];

        $settings = self::arrayRecursiveDiff($data[$key], DefaultSettings::GetShopInfo());
        $result = $this->ClearValue($settings);

        $show = array();
        if (isset($result['show']['title']))
            $show['title'] = 'false';
        if (isset($result['show']['logo']))
            $show['logo'] = 'false';
        if (count($show) > 0)
            $result['show'] = $show;

        $code = $this->templating->render('PokupoJsGeneratorBundle:Generator:Settings/_shopInfo.html.twig', array(
            'id' => $id,
            'data' => $result,
            'protocol' => $this->getProtocol()
        ));
        return $code;
    }

    public static function arrayRecursiveDiff($aArray1, $aArray2)
    {
        $aReturn = array();

        foreach ($aArray1 as $mKey => $mValue) {
            if (array_key_exists($mKey, $aArray2)) {
                if (is_array($mValue)) {
                    $aRecursiveDiff = self::arrayRecursiveDiff($mValue, $aArray2[$mKey]);
                    if (count($aRecursiveDiff)) {
                        $aReturn[$mKey] = $aRecursiveDiff;
                    }
                } else {
                    if ($mValue != $aArray2[$mKey]) {
                        $aReturn[$mKey] = $mValue;
                    }
                }
            } else {
                $aReturn[$mKey] = $mValue;
            }
        }
        return $aReturn;
    }

    private function ClearValue($data)
    {
        if ($data['useCustomTmpl'] == 'false') {
            unset($data['useCustomTmpl']);
            unset($data['idTmpl']);
            unset($data['pathTmpl']);
        }
        unset($data['active']);
        return $data;
    }

    private function getProtocol(){
        $protocol = 'http';
        if($this->request->isSecure() || $this->request->getPort() == 443 || $this->request->server->get('HTTP_X_FORWARDED_PROTO') == 'https')
            $protocol = 'https';

        return $protocol;
    }
}