function ContentJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.content = {
                active: true,
                disabled: true,
                showCart: false,
                block: {
                    showBlocks: false,
                    disabled: true,
                    containerId: {
                        slider: 'sliderBlockId',
                        carousel: 'carouselBlockId',
                        tile: 'tileBlockId',
                        empty: 'emptyBlockId'
                    },
                    count: 6,
                    useCustomTmpl: false,
                    pathTmpl: '',
                    idTmpl: {
                        slider: 'blockSliderTmpl',
                        carousel: 'blockCarouselTmpl',
                        tile: 'blockTileTmpl',
                        empty: 'blockNoResultsTmpl'
                    }
                },
                content: {
                    containerId: 'contentContentWidgetId',
                    listPerPage: '10, 20, 50',
                    defaultPerPage: '20',
                    useCustomTmpl: false,
                    pathTmpl: '',
                    idTmpl: {
                        table: "contentTableTmpl",
                        list: "contentListTmpl",
                        tile: "contentTileTmpl",
                        empty: "contentNoResultsTmpl"
                    }
                }
            }
        },
        Error: function () {
            $scope.error.content = {
                block: {
                    active: { valid: true, message: ''},
                    containerId: {
                        slider: {valid: true, message: ''},
                        carousel: {valid: true, message: ''},
                        tile: {valid: true, message: ''},
                        empty: {valid: true, message: ''}
                    },
                    count: {valid: true, message: ''},
                    useCustomTmpl: {valid: true, message: ''},
                    pathTmpl: {valid: true, message: ''},
                    idTmpl: {
                        slider: {valid: true, message: ''},
                        carousel: {valid: true, message: ''},
                        tile: {valid: true, message: ''},
                        empty: {valid: true, message: ''}
                    }
                },
                content: {
                    containerId: {valid: true, message: ''},
                    listPerPage: {valid: true, message: ''},
                    defaultPerPage: {valid: true, message: ''},
                    useCustomTmpl: {valid: true, message: ''},
                    pathTmpl: {valid: true, message: ''},
                    idTmpl: {
                        table: {valid: true, message: ''},
                        list: {valid: true, message: ''},
                        tile: {valid: true, message: ''},
                        empty: {valid: true, message: ''}
                    }
                }
            }
        },
        Watch: function () {
            $scope.$watch('form.content.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.content.block, ['count', 'pathTmpl']);
                    self.Error.Clear($scope.error.content.block.containerId, ['slider', 'carousel', 'tile', 'empty']);
                    self.Error.Clear($scope.error.content.block.idTmpl, ['slider', 'carousel', 'tile', 'empty']);
                    self.Error.Clear($scope.error.content.content, ['containerId', 'listPerPage', 'defaultPerPage', 'pathTmpl',]);
                    self.Error.Clear($scope.error.content.content.idTmpl, ['table', 'list', 'tile', 'empty',]);
                }
            });
            $scope.$watch('block.content.block.containerId.slider', function () {
                if (!$scope.error.content.block.containerId.slider.valid)
                    self.Validator.Block.Block.ContainerId.Slider();
            });
            $scope.$watch('block.content.block.containerId.carousel', function () {
                if (!$scope.error.content.block.containerId.carousel.valid)
                    self.Validator.Block.Block.ContainerId.Carousel();
            });
            $scope.$watch('block.content.block.containerId.tile', function () {
                if (!$scope.error.content.block.containerId.tile.valid)
                    self.Validator.Block.Block.ContainerId.Tile();
            });
            $scope.$watch('block.content.block.containerId.empty', function () {
                if (!$scope.error.content.block.containerId.empty.valid)
                    self.Validator.Block.Block.ContainerId.Empty();
            });
            $scope.$watch('block.content.block.count', function () {
                if (!$scope.error.content.block.count.valid)
                    self.Validator.Block.Block.Count();
            });
            $scope.$watch('block.content.block.idTmpl.slider', function () {
                if (!$scope.error.content.block.idTmpl.slider.valid)
                    self.Validator.Block.Block.IdTmpl.Slider();
            });
            $scope.$watch('block.content.block.idTmpl.carousel', function () {
                if (!$scope.error.content.block.idTmpl.carousel.valid)
                    self.Validator.Block.Block.IdTmpl.Carousel();
            });
            $scope.$watch('block.content.block.idTmpl.tile', function () {
                if (!$scope.error.content.block.idTmpl.tile.valid)
                    self.Validator.Block.Block.IdTmpl.Tile();
            });
            $scope.$watch('block.content.content.containerId', function () {
                if (!$scope.error.content.content.containerId.valid)
                    self.Validator.Block.Content.ContainerId();
            });
            $scope.$watch('block.content.content.listPerPage', function () {
                if (!$scope.error.content.content.listPerPage.valid)
                    self.Validator.Block.Content.ListPerPage();
            });
            $scope.$watch('block.content.content.defaultPerPage', function () {
                if (!$scope.error.content.content.defaultPerPage.valid)
                    self.Validator.Block.Content.DefaultPerPage();
            });
            $scope.$watch('block.content.content.idTmpl.table', function () {
                if (!$scope.error.content.content.idTmpl.table.valid)
                    self.Validator.Block.Content.IdTmpl.Table();
            });
            $scope.$watch('block.content.content.idTmpl.tile', function () {
                if (!$scope.error.content.content.idTmpl.tile.valid)
                    self.Validator.Block.Content.IdTmpl.Tile();
            });
            $scope.$watch('block.content.content.idTmpl.list', function () {
                if (!$scope.error.content.content.idTmpl.list.valid)
                    self.Validator.Block.Content.IdTmpl.List();
            });
            $scope.$watch('block.content.content.idTmpl.empty', function () {
                if (!$scope.error.content.content.idTmpl.empty.valid)
                    self.Validator.Block.Content.IdTmpl.Empty();
            });
        }
    };
    self.Validator = {
        Form: {
            Content: function(i){
                self.index = i;
                var test = true;
                if (!self.Validator.Block.Content.ContainerId())
                    test = false;
                if (!self.Validator.Block.Content.ListPerPage())
                    test = false;
                if (!self.Validator.Block.Content.DefaultPerPage())
                    test = false;
                if ($scope.form.content.content.useCustomTmpl) {
                    if (!self.Validator.Block.Content.PathTmpl())
                        test = false;
                    if (!self.Validator.Block.Content.IdTmpl.Table())
                        test = false;
                    if (!self.Validator.Block.Content.IdTmpl.Tile())
                        test = false;
                    if (!self.Validator.Block.Content.IdTmpl.List())
                        test = false;
                    if (!self.Validator.Block.Content.IdTmpl.Empty())
                        test = false;
                }
                if (!test)
                    return false;

                return true;
            },
            Block: function(i){
                self.index = i;
                var test = true;
                if (!self.Validator.Block.Block.ContainerId.Slider())
                    test = false;
                if (!self.Validator.Block.Block.ContainerId.Carousel())
                    test = false;
                if (!self.Validator.Block.Block.ContainerId.Tile())
                    test = false;
                if (!self.Validator.Block.Block.ContainerId.Empty())
                    test = false;
                if (!self.Validator.Block.Block.Count())
                    test = false;
                if ($scope.form.content.block.useCustomTmpl) {
                    if (!self.Validator.Block.Block.PathTmpl())
                        test = false;
                    if (!self.Validator.Block.Block.IdTmpl.Carousel())
                        test = false;
                    if (!self.Validator.Block.Block.IdTmpl.Slider())
                        test = false;
                    if (!self.Validator.Block.Block.IdTmpl.Tile())
                        test = false;
                }

                if (!test)
                    return false;

                return true;
            }
        },
        Block: {
            Block: {
                ContainerId: {
                    Slider: function () {
                        $scope.error.content.block.containerId.slider = {valid: true, message: ''};
                        if (!$scope.form.content.block.containerId.slider || $.trim($scope.form.content.block.containerId.slider) == '') {
                            $scope.error.content.block.containerId.slider.valid = false;
                            $scope.error.content.block.containerId.slider.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Carousel: function () {
                        $scope.error.content.block.containerId.carousel = {valid: true, message: ''};
                        if (!$scope.form.content.block.containerId.carousel || $.trim($scope.form.content.block.containerId.carousel) == '') {
                            $scope.error.content.block.containerId.carousel.valid = false;
                            $scope.error.content.block.containerId.carousel.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Tile: function () {
                        $scope.error.content.block.containerId.tile = {valid: true, message: ''};
                        if (!$scope.form.content.block.containerId.tile || $.trim($scope.form.content.block.containerId.tile) == '') {
                            $scope.error.content.block.containerId.tile.valid = false;
                            $scope.error.content.block.containerId.tile.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Empty: function () {
                        $scope.error.content.block.containerId.empty = {valid: true, message: ''};
                        if (!$scope.form.content.block.containerId.empty || $.trim($scope.form.content.block.containerId.empty) == '') {
                            $scope.error.content.block.containerId.empty.valid = false;
                            $scope.error.content.block.containerId.empty.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    }
                },
                Count: function () {
                    $scope.error.content.block.count = {valid: true, message: ''};
                    if (!$scope.form.content.block.count || $.trim($scope.form.content.block.count) == '') {
                        $scope.error.content.block.count.valid = false;
                        $scope.error.content.block.count.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    return true;
                },
                PathTmpl: function () {
                    $scope.error.content.block.pathTmpl = {valid: true, message: ''};
                    if (!$scope.form.content.block.pathTmpl || $.trim($scope.form.content.block.pathTmpl) == '') {
                        $scope.error.content.block.pathTmpl.valid = false;
                        $scope.error.content.block.pathTmpl.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    if($scope.form.content.block.pathTmpl){
                        $scope.TmplValidate($scope.form.content.block, function(data){
                            if(data.result != 'ok') {
                                $scope.error.content.block.pathTmpl.valid = false;
                                $scope.error.content.block.pathTmpl.message = 'Файл шаблона не найден';
                                $scope.$apply();
                                return false;
                            }
                            else
                                $scope.Next(self.index);
                            return true;
                        });
                    }
                    else
                        return true;
                },
                IdTmpl: {
                    Slider: function () {
                        $scope.error.content.block.idTmpl.slider = {valid: true, message: ''};
                        if (!$scope.form.content.block.idTmpl.slider || $.trim($scope.form.content.block.idTmpl.slider) == '') {
                            $scope.error.content.block.idTmpl.slider.valid = false;
                            $scope.error.content.block.idTmpl.slider.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Carousel: function () {
                        $scope.error.content.content.idTmpl.carousel = {valid: true, message: ''};
                        if (!$scope.form.content.content.idTmpl.carousel || $.trim($scope.form.content.content.idTmpl.carousel) == '') {
                            $scope.error.content.content.idTmpl.carousel.valid = false;
                            $scope.error.content.content.idTmpl.carousel.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Tile: function () {
                        $scope.error.content.content.idTmpl.tile = {valid: true, message: ''};
                        if (!$scope.form.content.content.idTmpl.tile || $.trim($scope.form.content.content.idTmpl.tile) == '') {
                            $scope.error.content.content.idTmpl.tile.valid = false;
                            $scope.error.content.content.idTmpl.tile.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    }
                }
            },
            Content: {
                ContainerId: function () {
                    $scope.error.content.content.containerId = {valid: true, message: ''};
                    if (!$scope.form.content.content.containerId || $.trim($scope.form.content.content.containerId) == '') {
                        $scope.error.content.content.containerId.valid = false;
                        $scope.error.content.content.containerId.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    return true;
                },
                ListPerPage: function () {
                    $scope.error.content.content.listPerPage = {valid: true, message: ''};
                    var list = self.Get.ListPerPage();
                    if (list.length > 0) {
                        $.each(list, function (i) {
                            var intItem = parseInt(list[i]);
                            if (intItem.toString() != list[i]) {
                                $scope.error.content.content.listPerPage.valid = false;
                                $scope.error.content.content.listPerPage.message = 'Значения в списке должны быть числами';
                                return false;
                            }
                        })
                    }
                    return true;
                },
                DefaultPerPage: function () {
                    $scope.error.content.content.defaultPerPage = {valid: true, message: ''};
                    if ($scope.form.content.content.defaultPerPage && $.trim($scope.form.content.content.defaultPerPage) != '') {
                        var def = parseInt($scope.form.content.content.defaultPerPage);
                        if (def.toString() != $scope.form.content.content.defaultPerPage) {
                            $scope.error.content.content.defaultPerPage.valid = false;
                            $scope.error.content.content.defaultPerPage.message = 'Значение должно быть числом';
                            return false;
                        }
                        var list = self.Get.ListPerPage();
                        if (list.length > 0 && $scope.error.content.content.listPerPage.valid && $.inArray(def.toString(), list) < 0) {
                            $scope.error.content.content.defaultPerPage.valid = false;
                            $scope.error.content.content.defaultPerPage.message = 'Значение должно присутствовать в списке допустимых значений';
                            return false;
                        }
                    }
                    return true;
                },
                PathTmpl: function () {
                    $scope.error.content.content.pathTmpl = {valid: true, message: ''};
                    if (!$scope.form.content.content.pathTmpl || $.trim($scope.form.content.content.pathTmpl) == '') {
                        $scope.error.content.content.pathTmpl.valid = false;
                        $scope.error.content.content.pathTmpl.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    if($scope.form.content.content.pathTmpl){
                        $scope.TmplValidate($scope.form.content.content, function(data){
                            if(data.result != 'ok') {
                                $scope.error.content.content.pathTmpl.valid = false;
                                $scope.error.content.content.pathTmpl.message = 'Файл шаблона не найден';
                                $scope.$apply();
                                return false;
                            }
                            else
                                $scope.Next(self.index);
                            return true;
                        });
                    }
                    else
                        return true;
                },
                IdTmpl: {
                    Table: function () {
                        $scope.error.content.content.idTmpl.table = {valid: true, message: ''};
                        if (!$scope.form.content.content.idTmpl.table || $.trim($scope.form.content.content.idTmpl.table) == '') {
                            $scope.error.content.content.idTmpl.table.valid = false;
                            $scope.error.content.content.idTmpl.table.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Tile: function () {
                        $scope.error.content.content.idTmpl.tile = {valid: true, message: ''};
                        if (!$scope.form.content.content.idTmpl.tile || $.trim($scope.form.content.content.idTmpl.tile) == '') {
                            $scope.error.content.content.idTmpl.tile.valid = false;
                            $scope.error.content.content.idTmpl.tile.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    List: function () {
                        $scope.error.content.content.idTmpl.list = {valid: true, message: ''};
                        if (!$scope.form.content.content.idTmpl.list || $.trim($scope.form.content.content.idTmpl.list) == '') {
                            $scope.error.content.content.idTmpl.list.valid = false;
                            $scope.error.content.content.idTmpl.list.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Empty: function () {
                        $scope.error.content.content.idTmpl.empty = {valid: true, message: ''};
                        if (!$scope.form.content.content.idTmpl.empty || $.trim($scope.form.content.content.idTmpl.empty) == '') {
                            $scope.error.content.content.idTmpl.empty.valid = false;
                            $scope.error.content.content.idTmpl.empty.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    }
                }
            }
        }
    };
    self.Get = {
        ListPerPage: function () {
            var list = [];
            if ($scope.form.content.content.listPerPage && $.trim($scope.form.content.content.listPerPage) != '') {
                list = $scope.form.content.content.listPerPage.split(',');
                $.each(list, function (i) {
                    list[i] = $.trim(list[i]);
                })
            }
            return list;
        }
    };
    self.Error = {
        Clear: function(fields, keys) {
            if (keys) {
                $.each(keys, function (i, key) {
                    fields[key] = {
                        valid: true,
                        message: ''
                    }
                })
            }
            else {
                $.each(fields, function (i) {
                    fields[i] = {
                        valid: true,
                        message: ''
                    }
                })
            }
        }
    };

    self.Init.Self();
}