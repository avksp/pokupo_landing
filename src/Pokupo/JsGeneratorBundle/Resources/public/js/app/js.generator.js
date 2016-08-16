function JsGeneratorCtrl($scope) {
    var self = this;
    self.theme = {};
    self.typeSettings = {};
    self.choice = {};
    self.content = {}; //3
    self.catalog = {}; //4
    self.goods = {}; //5
    self.search = {}; //6
    self.advancedSearch = {};//7
    self.breadcrumbs = {}; //8
    self.cartGoods = {}; //9
    self.cartInfo = {}; //10
    self.registration = {}; //11
    self.registrationSeller = {}; //12
    self.authentication = {}; //13
    self.userInfo = {}; //14
    self.profile = {}; //15
    self.cartGoodsCabinet = {}; //16
    self.order = {}; //17
    self.orderList = {}; //18
    self.favorites = {}; //19
    self.message = {}; //20
    self.payment = {}; //21
    self.menuCabinet = {}; //22
    self.shopInfo = {};

    $scope.steps = {
        1: {
            widget: 'theme',
            disabled: false,
            show: true
        },
        2: {
            widget: 'typeSettings',
            disabled: true,
            show: true
        },
        3: {
            widget: 'choice',
            disabled: true,
            show: false
        },
        4: {
            widget: 'shopInfo',
            disabled: true,
            show: false
        },
        5: {
            widget: 'content',
            disabled: true,
            show: false
        },
        6: {
            widget: 'content',
            disabled: true,
            show: false
        },
        7: {
            widget: 'catalog',
            disabled: true,
            show: false
        },
        8: {
            widget: 'breadcrumbs',
            disabled: true,
            show: false
        },
        9: {
            widget: 'goods',
            disabled: true,
            show: false
        },
        10: {
            widget: 'goods',
            disabled: true,
            show: false
        },
        11: {
            widget: 'order',
            disabled: true,
            show: false
        },
        12: {
            widget: 'payment',
            disabled: true,
            show: false
        },
        13: {
            widget: 'cartGoods',
            disabled: true,
            show: false
        },
        14: {
            widget: 'registration',
            disabled: true,
            show: false
        },
        15: {
            widget: 'registrationSeller',
            disabled: true,
            show: false
        },
        16: {
            widget: 'authentication',
            disabled: true,
            show: false
        },
        17: {
            widget: 'menuCabinet',
            disabled: true,
            show: false
        },
        18: {
            widget: 'profile',
            disabled: true,
            show: false
        },
        19: {
            widget: 'cartGoodsCabinet',
            disabled: true,
            show: false
        },
        20: {
            widget: 'orderList',
            disabled: true,
            show: false
        },
        21: {
            widget: 'favorites',
            disabled: true,
            show: false
        },
        22: {
            widget: 'message',
            disabled: true,
            show: false
        },
        23: {
            widget: 'cartInfo',
            disabled: true,
            show: false
        },
        24: {
            widget: 'userInfo',
            disabled: true,
            show: false
        },
        25: {
            widget: 'search',
            disabled: true,
            show: false
        },
        26: {
            widget: 'advancedSearch',
            disabled: true,
            show: false
        },
        27: {
            widget: 'advancedSearch',
            disabled: true,
            show: false
        },
        28: {
            widget: 'generator',
            disabled: true,
            show: true
        }
    }

    $scope.currentStep = 1;
    $scope.countSteps = 28;
    $scope.pathToCreate = null;
    $scope.pathToTmplValidator = '/app_dev.php/js_generator/tmpl_validate/'
    $scope.form = {
        shopId: 0,
        choice: {active: true},
        generator: {active: true},
        profileCabinetWidget:{active: false, disabled: false},
        infoWidget: {active: false, disabled: false},
        searchWidget: {active: false, disabled: false}
    }

    $scope.error = {};

    $scope.Click = {
        Next: ClickNext,
        Tab: ClickTab,
        SendData: SendData
    }
    $scope.Event = {
        ChangeType: ChangeType,
        SelectProfileWidget: SelectProfileWidget,
        SelectSearchWidget: SelectSearchWidget,
        SelectInfoWidget: SelectInfoWidget
    };
    $scope.GetTheme = GetTheme;
    $scope.result = null;
    $scope.selectAll = false;
    $scope.TmplValidate = TmplValidate;
    $scope.Next = Next;

    function Init() {
        self.typeSettings = new TypeSettingsJsGenerator($scope);
        self.search = new SearchJsGenerator($scope);
        self.advancedSearch = new AdvancedSearchJsGenerator($scope);
        self.cartGoods = new CartGoodsJsGenerator($scope);
        self.cartGoodsCabinet = new CartGoodsCabinetJsGenerator($scope);
        self.cartInfo = new CartInfoJsGenerator($scope);
        self.userInfo = new UserInfoJsGenerator($scope);
        self.catalog = new CatalogJsGenerator($scope);
        self.breadcrumbs = new BreadcrumbsJsGenerator($scope);
        self.content = new ContentJsGenerator($scope);
        self.goods = new GoodsJsGenerator($scope);
        self.authentication = new AuthenticationJsGenerator($scope);
        self.profile = new ProfileJsGenerator($scope);
        self.registration = new RegistrationJsGenerator($scope);
        self.registrationSeller = new RegistrationSellerJsGenerator($scope);
        self.order = new OrderJsGenerator($scope);
        self.orderList = new OrderListJsGenerator($scope);
        self.favorites = new FavoritesJsGenerator($scope);
        self.message = new MessageJsGenerator($scope);
        self.payment = new PaymentJsGenerator($scope);
        self.menuCabinet = new MenuCabinetJsGenerator($scope);
        self.theme = new ThemeJsGenerator($scope);
        self.shopInfo = new ShopInfoJsGenerator($scope);
        ChangeType();
        InitProgressBar();
        UpdateProgressBar();
        ClickNext(1);
    }

    function GetTheme(){
        return ThemeList[$scope.form.theme.id];
    }

    function TmplValidate(data, callback) {
        var container = $('.tab-pane.active a.next');
        var loader = new Loader(container);
        $.ajax({
            url: $scope.pathToTmplValidator,
            data: {tmpl: data.pathTmpl},
            type: 'post',
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                if(loader.ready == false)
                    loader.Create();
            },
            success: function (message) {
                callback(message);
                loader.Delete();
            }
        })
    }

    function InitProgressBar() {
        $('#jsGeneratorSteps a').on('shown.bs.tab', function (e) {
            if($scope.currentStep == 28){
                $scope.result = null;
            }
            UpdateProgressBar();
        });
    }

    function UpdateProgressBar() {
        var step = $.inArray($scope.currentStep,  CountActive()) + 1;
        var percent = (parseInt(step) / $scope.countSteps) * 100;
        $('.progress-bar').css({width: percent + '%'});
    }

    function ChangeType(){
        if($scope.form.typeSettings.id == 1){
            AllSetActive();
            AllSetDefaultOptions(true);
            AllSetHide();
            AllSetDisable();
        }
        else{
            AllSetShow();
            ResetActiveWidgets();
            AllSetDefaultOptions(false);
            SelectProfileWidget();
            SelectInfoWidget();
            SelectSearchWidget();
        }
        self.theme.Change();
    }

    function SelectProfileWidget(){
        if(!$scope.form.profileCabinetWidget.disabled) {
            if ($scope.form.profileCabinetWidget.active) {
                self.menuCabinet.Set.Require(true);
                self.profile.Set.Require(true);
                self.orderList.Set.Require(true);
                self.favorites.Set.Require(true);
                self.message.Set.Require(true);
                if ($scope.form.cartGoods.active) {
                    $scope.form.cartGoodsCabinet.active = false;
                    $scope.form.cartGoodsCabinet.disabled = false;
                }
                else {
                    $scope.form.cartGoodsCabinet.active = false;
                    $scope.form.cartGoodsCabinet.disabled = true;
                }
                $scope.form.userInfo.show.profile = true;
            }
            else {
                self.menuCabinet.Set.Require(false);
                self.profile.Set.Require(false);
                self.orderList.Set.Require(true);
                self.favorites.Set.Require(false);
                self.message.Set.Require(false);
                if ($scope.form.cartGoods.active) {
                    $scope.form.cartGoodsCabinet.active = false;
                    $scope.form.cartGoodsCabinet.disabled = false;
                }
                else {
                    $scope.form.cartGoodsCabinet.active = false;
                    $scope.form.cartGoodsCabinet.disabled = true;
                }
                $scope.form.userInfo.show.profile = false;
            }
        }
    }

    function SelectInfoWidget(){
        if(!$scope.form.infoWidget.disabled) {
            if ($scope.form.infoWidget.active) {
                $scope.form.cartInfo.active = false;
                if($scope.form.cartGoods.active)
                    $scope.form.cartInfo.disabled = false;
                else
                    $scope.form.cartInfo.disabled = true;
            }
            else {
                $scope.form.cartInfo.active = false;
                $scope.form.cartInfo.disabled = true;
            }
        }
    }

    function SelectSearchWidget(){
        if(!$scope.form.searchWidget.disabled) {
            if ($scope.form.searchWidget.active) {
                self.search.Set.Require(true);
                self.advancedSearch.Set.Require(true);
            }
            else {
                self.search.Set.Require(false);
                self.advancedSearch.Set.Require(false);
            }
        }
    }

    function AllSetActive(){
        $.each($scope.form, function(i){
            $scope.form[i].active = true;
        });
        $scope.form.content.block.showBlocks = true;
        $scope.form.goods.related.active = true;
        $scope.form.advancedSearch.form.showForm = true;
        $scope.form.search.showCatalog = true;
        $scope.form.advancedSearch.form.showCatalog = true;
    }

    function AllSetDefaultOptions(check){
        for(var key in $scope.form.goods.show){
            $scope.form.goods.show[key] = check;
        }
        $scope.form.goods.show.buy = true;
        for(var key in $scope.form.favorites.show){
            $scope.form.favorites.show[key] = check;
        }
        for(var key in $scope.form.userInfo.show){
            $scope.form.userInfo.show[key] = check;
        }
        for(var key in $scope.form.cartInfo.show){
            $scope.form.cartInfo.show[key] = check;
        }
        $scope.form.content.showCart = check;
        $scope.form.advancedSearch.result.showCart = check;
        if(check)
            $scope.form.cartInfo.showTitle = 'always';
        else
            $scope.form.cartInfo.showTitle = 'never';
    }

    function AllSetShow(){
        $.each($scope.steps, function(i){
            $scope.steps[i].show = true;
        });
    }

    function AllSetHide(){
        $.each($scope.steps, function(i){
            if($.inArray(i, [1,2,28]))
                $scope.steps[i].show = false;
        });
    }

    function AllSetDisable(){
        $.each($scope.steps, function(i){
            if($.inArray(i, [1,2])>=0)
                $scope.steps[i].disabled = true;
        });
        $.each($scope.form, function(i){
            if(i != 'theme' && i != 'typeSettings' && i != 'choice')
                $scope.form[i].disabled = true;
        });
        $scope.form.content.block.disabled = true;
        $scope.form.goods.related.disabled = true;
        $scope.form.advancedSearch.form.disabled = true;
    }

    function ResetActiveWidgets(){
        $.each(self, function(i){
            if(i != 'theme' && i != 'typeSettings' && i != 'generator' && i != 'choice') {
                self[i].Init.Fields();
                $scope.form.profileCabinetWidget.disabled = false;
                $scope.form.profileCabinetWidget.active = false;
                $scope.form.searchWidget.active = false;
                $scope.form.searchWidget.disabled = false;
                $scope.form.infoWidget.active = false;
                $scope.form.infoWidget.disabled = false;
            }
            else{
                $scope.form.searchWidget.active = false;
                $scope.form.infoWidget.active = false;
            }
        })
    }

    function ClickNext(i) {
        if (i == 2 && $scope.form.typeSettings.id == 1){
            i = 27;
        }
        if (i == 3) {
            $scope.countSteps = CountActive().length;
        }
        if (StepValidator(i)) {
            Next(i);
        }
        return false;
    }

    function Next(i){
        if ($scope.steps[i + 1]) {
            if ((i + 1) == 6 && $scope.form[$scope.steps[i + 1].widget].active && $scope.form[$scope.steps[i + 1].widget].block.active) {
                $scope.steps[i + 1].disabled = false;
                $scope.currentStep = i + 1;
                $('[href=#step' + $scope.currentStep + ']').tab('show');
            }
            else if ((i + 1) == 10 && $scope.form[$scope.steps[i + 1].widget].active && $scope.form[$scope.steps[i + 1].widget].related.active) {
                $scope.steps[i + 1].disabled = false;
                $scope.currentStep = i + 1;
                $('[href=#step' + $scope.currentStep + ']').tab('show');
            }
            else if ((i + 1) == 26 && $scope.form[$scope.steps[i + 1].widget].active) {
                $scope.steps[i + 1].disabled = false;
                $scope.currentStep = i + 1;
                $('[href=#step' + $scope.currentStep + ']').tab('show');
            }
            else if ((i + 1) == 27 && $scope.form[$scope.steps[i + 1].widget].active && $scope.form[$scope.steps[i + 1].widget].form.showForm) {
                $scope.steps[i + 1].disabled = false;
                $scope.currentStep = i + 1;
                $('[href=#step' + $scope.currentStep + ']').tab('show');
            }
            else if ($scope.form[$scope.steps[i + 1].widget].active && $.inArray((i + 1), [6, 10, 26, 27]) < 0) {
                $scope.steps[i + 1].disabled = false;
                $scope.currentStep = i + 1;
                $('[href=#step' + $scope.currentStep + ']').tab('show');
            }
            else {
                ++i;
                ClickNext(i)
            }
        }
    }

    function ClickTab(i) {
        if (!$scope.steps[i].disabled) {
            $scope.currentStep = i;
            $('[href=#step' + i + ']').tab('show');
        }
        return false;
    }

    function SendData() {
        $scope.result = null;
        var container = $('#GeneratorButton');
        var loader = new Loader(container);
        $.ajax({
            url: $scope.pathToCreate,
            data: {data: $scope.form},
            type: 'post',
            dataType: 'json',
            beforeSend: function (XMLHttpRequest) {
                if(loader.ready == false)
                    loader.Create();
            },
            success: function (message) {
                if(message.result) {
                    $scope.result = message.result;
                    $scope.$apply();
                }
                loader.Delete();
            }
        })
    }

    function CountActive() {
        var result = [];
        var j = 0;
        $.each($scope.steps, function (i) {
            if ($scope.form[$scope.steps[i].widget].active) {
                result[j] = parseInt(i);
                ++j;
            }
        });

        return result;
    }

    function ValidatorChoice() {
        return true;
    }

    function StepValidator(i) {
        switch (i) {
            case 1:
                if (!self.theme.Validator.Form())
                    return false;
                break;
            case 2:
                if (!self.typeSettings.Validator.Form())
                    return false;
                break;
            case 3:
                if (!ValidatorChoice())
                    return false;
                break;
            case 4:
                if (!self.shopInfo.Validator.Form(i))
                    return false;
                break;
            case 5:
                if (!self.content.Validator.Form.Content(i))
                    return false;
                break;
            case 6:
                if (!self.content.Validator.Form.Block(i))
                    return false;
                break;
            case 7:
                if (!self.catalog.Validator.Form(i))
                    return false;
                break;
            case 8:
                if (!self.breadcrumbs.Validator.Form(i))
                    return false;
                break;
            case 9:
                if (!self.goods.Validator.Form(i))
                    return false;
                break;
            case 10:
                break;
            case 11:
                if (!self.order.Validator.Form(i))
                    return false;
                break;
            case 12:
                if (!self.payment.Validator.Form(i))
                    return false;
                break;
            case 13:
                if (!self.cartGoods.Validator.Form(i))
                    return false;
                break;
            case 14:
                if (!self.registration.Validator.Form(i))
                    return false;
                break;
            case 15:
                if (!self.registrationSeller.Validator.Form(i))
                    return false;
                break;
            case 16:
                if (!self.authentication.Validator.Form(i))
                    return false;
                break;
            case 17:
                if (!self.menuCabinet.Validator.Form(i))
                    return false;
                break;
            case 18:
                if (!self.profile.Validator.Form(i))
                    return false;
                break;
            case 19:
                if (!self.cartGoodsCabinet.Validator.Form(i))
                    return false;
                break;
            case 20:
                if (!self.orderList.Validator.Form(i))
                    return false;
                break;
            case 21:
                if (!self.favorites.Validator.Form(i))
                    return false;
                break;
            case 22:
                if (!self.message.Validator.Form(i))
                    return false;
                break;
            case 23:
                if (!self.cartInfo.Validator.Form(i))
                    return false;
                break;
            case 24:
                if (!self.userInfo.Validator.Form(i))
                    return false;
                break;
            case 25:
                if (!self.search.Validator.Form(i))
                    return false;
                break;
            case 26:
                if (!self.advancedSearch.Validator.Form.Result(i))
                    return false;
                break;
            case 27:
                if (!self.advancedSearch.Validator.Form.Form(i))
                    return false;
                break;
        }
        return true;
    }

    Init();
}