'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}

$(document).ready(function () {
    //jQuery("#queryButton").click(queries);
    //jQuery("#expandButton1").click(expand1);
    //jQuery("#expandButton2").click(expand2);
    //jQuery("#dataBindingButton").click(dataBinding);
    jQuery("#createListButton").click(createList);
    //jQuery("#createItemButton").click(createItem);
    //jQuery("#updateItemButton").click(updateItem);
    //jQuery("#proxyButton").click(webProxy);
    //jQuery("#hostButton").click(callToHostWeb);
    //jQuery("#nextButton").click(continuations);
    jQuery("#createlist1").click(createlist1);
    jQuery("#createlist2").click(createlist1);
    jQuery("#addcolumnButton").click(addColumn);
});
function createlist1() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists",
        type: "POST",
        data: JSON.stringify({
            "__metadata": { type: "SP.List" },
            BaseTemplate: SP.ListTemplateType.announcements,
            Title: "Brands"
        }),
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("List1 Created");
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call Failed. Error:" + message);
    });
}

function createlist2() {
    var call=jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists",
        type: "POST",
        data: JSON.stringify({
            "__metradata": { type: "SP.List" },
            BaseTemplate: SP.ListTemplateType.genericList,
            Title:"Mobiles"
        }),
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("List2 Created");
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call Failed. Error:" + message);
    });
}

function addColumn() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Brands')/fields",
        type: "POST",
        data: JSON.stringify({
            "__metadata": { type: "SP.Field" },
            FieldTypeKind: 1,
            Title: "MobileType"
        }),
        headers:
        {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
            //"X-HTTP-Method": "MERGE",
            // "If-Match": result.d.__metadata.etag
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("Field added!!!")
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        failHandler(jqXHR, textStatus, errorThrown);
    });
}

function addColumn1() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Brands')/fields",
        type: "POST",
        data: JSON.stringify({
            "__metadata": { type: "SP.Field" },
            FieldTypeKind: 3,
            Title:"MobileType"
        }),
        headers:
        {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
            //"X-HTTP-Method": "MERGE",
           // "If-Match": result.d.__metadata.etag
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("Field added!!!")
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        failHandler(jqXHR, textStatus, errorThrown);
    });
}

function createList() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists",
        type: "POST",
        data: JSON.stringify({
            "__metadata": { type: "SP.List" },
            BaseTemplate: SP.ListTemplateType.tasks,
            Title: "Tasks"
        }),
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("List added");
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
}

function queries() {
    var call1 = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/?$select=Title",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    var call2 = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists?$select=Title,Hidden,ItemCount&$orderby=ItemCount&$filter=((Hidden eq false) and (ItemCount gt 0))",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    var calls = jQuery.when(call1, call2);
    calls.done(function (callback1, callback2) {
        var message = jQuery("#message");
        message.text("Lists in " + callback1[0].d.Title);
        message.append("<br/>");
        jQuery.each(callback2[0].d.results, function (index, value) {
            message.append(String.format("List {0} has {1} items and is {2} hidden",
                value.Title, value.ItemCount, value.Hidden ? "" : "not"));
            message.append("<br/>");
        });
    });
    calls.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
}

function expand1() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web?$select=Title,Lists/Title,Lists/Hidden,Lists/ItemCount&$expand=Lists",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("Lists in " + data.d.Title);
        message.append("<br/>");
        jQuery.each(data.d.Lists.results, function (index, value) {
            message.append(String.format("List {0} has {1} items and is {2} hidden",
                value.Title, value.ItemCount, value.Hidden ? "" : "not"));
            message.append("<br/>");
        });
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
}

function expand2() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Products')/Items?$select=Title,Category/Title&$filter=(Category/Title eq 'Beverages')&$expand=Category/Title",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("Beverages");
        message.append("<br/>");
        jQuery.each(data.d.results, function (index, value) {
            message.append(value.Title);
            message.append("<br/>");
        });
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
}

function dataBinding() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Products')/Items/?$select=Title,UnitsInStock,UnitPrice,Category/Title&$filter=(Category/Title eq 'Beverages')&$expand=Category/Title&$top=5",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var message = jQuery("#message");
        message.text("Beverages");
        message.append("<br/>");
        var template = jQuery("#products-template");
        message.append(template.render(data.d.results));
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
}

function createItem() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/?$select=Title,CurrentUser/Id&$expand=CurrentUser/Id",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var userId = data.d.CurrentUser.Id;
        addItem(userId);
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        failHandler(jqXHR, textStatus, errorThrown);
    });

    function addItem(userId) {
        var due = new Date();
        due.setDate(due.getDate() + 7);

        var call = jQuery.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Tasks')/Items",
            type: "POST",
            data: JSON.stringify({
                "__metadata": { type: "SP.Data.TasksListItem" },
                Title: "Sample Task",
                AssignedToId: userId,
                DueDate: due
            }),
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            }
        });
        call.done(function (data, textStatus, jqXHR) {
            var div = jQuery("#message");
            div.text("Item added");
        });
        call.fail(function (jqXHR, textStatus, errorThrown) {
            failHandler(jqXHR, textStatus, errorThrown);
        });
    }

    function failHandler(jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    }
}

function updateItem() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Tasks')/Items/?$top=1",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        var items = data.d.results;
        if (items.length > 0) {
            var item = items[0];
            updateItem(item);
        }
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        failHandler(jqXHR, textStatus, errorThrown);
    });

    function updateItem(item) {
        var call = jQuery.ajax({
            url: _spPageContextInfo.webAbsoluteUrl +
                "/_api/Web/Lists/getByTitle('Tasks')/Items(" +
                item.Id + ")",
            type: "POST",
            data: JSON.stringify({
                "__metadata": { type: "SP.Data.TasksListItem" },
                Status: "In Progress",
                PercentComplete: 0.10
            }),
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "IF-MATCH": item.__metadata.etag,
                "X-Http-Method": "PATCH"
            }
        });
        call.done(function (data, textStatus, jqXHR) {
            var div = jQuery("#message");
            div.text("Item updated");
        });
        call.fail(function (jqXHR, textStatus, errorThrown) {
            failHandler(jqXHR, textStatus, errorThrown);
        });
    }

    function failHandler(jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    }
}

function webProxy() {
    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.WebProxy.invoke",
        type: "POST",
        data: JSON.stringify(
            {
                "requestInfo": {
                    "__metadata": { "type": "SP.WebRequestInfo" },
                    "Url": "http://services.odata.org/Northwind/Northwind.svc/Categories/?$format=json",
                    "Method": "GET"
                }
            }),
        headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        if (data.d.Invoke.StatusCode == 200) {
            var categories = JSON.parse(data.d.Invoke.Body);

            var message = jQuery("#message");
            message.text("Categories in the remote Northwind service:");
            message.append("<br/>");
            jQuery.each(categories.d.results, function (index, value) {
                message.append(value.CategoryName);
                message.append("<br/>");
            });
        } else {
            var message = data.d.Invoke.Body;
            alert("Call failed. Error: " + message);
        }
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
}

function callToHostWeb() {
    var hostUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

    var scriptbase = hostUrl + "/_layouts/15/";
    jQuery.getScript(scriptbase + "SP.RequestExecutor.js", getItems);

    function getItems() {
        var executor = new SP.RequestExecutor(appUrl);
        var url = appUrl + "/_api/SP.AppContextSite(@target)/Web/Lists/getByTitle('Categories')/Items?$select=Title&@target='" + hostUrl + "'";
        executor.executeAsync(
            {
                url: url,
                method: "GET",
                dataType: "json",
                headers: {
                    Accept: "application/json;odata=verbose"
                },
                success: function (data) {
                    var response = JSON.parse(data.body);
                    var message = jQuery("#message");
                    message.text("Categories in the host web list:");
                    message.append("<br/>");
                    jQuery.each(response.d.results, function (index, value) {
                        message.append(value.Title);
                        message.append("<br/>");
                    });
                },
                error: function (data, errorCode, errorMessage) {
                    alert(errorMessage);
                }
            }
        );
    }

    function getQueryStringParameter(paramToRetrieve) {
        var params =
            document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }
    }
}

function continuations() {
    var hostUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

    var scriptbase = hostUrl + "/_layouts/15/";
    jQuery.getScript(scriptbase + "SP.RequestExecutor.js", getItems);

    var url = appUrl + "/_api/SP.AppContextSite(@target)/Web/Lists/getByTitle('Order Details')/Items?$select=Title&@target='" + hostUrl + "'";

    var message = jQuery("#message");
    message.text("");

    function getItems() {
        var executor = new SP.RequestExecutor(appUrl);
        executor.executeAsync(
            {
                url: url,
                method: "GET",
                dataType: "json",
                headers: {
                    Accept: "application/json;odata=verbose"
                },
                success: function (data) {
                    var response = JSON.parse(data.body);
                    message.append(String.format("Retrieved {0} items", response.d.results.length));
                    message.append("<br/>");

                    if (response.d.__next) {
                        url = response.d.__next;
                        getItems();
                    }
                },
                error: function (data, errorCode, errorMessage) {
                    alert(errorMessage);
                }
            }
        );
    }

    function getQueryStringParameter(paramToRetrieve) {
        var params =
            document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }
    }
}


