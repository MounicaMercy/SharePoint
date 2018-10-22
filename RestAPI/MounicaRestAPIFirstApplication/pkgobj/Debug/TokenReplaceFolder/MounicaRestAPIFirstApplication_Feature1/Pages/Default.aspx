<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script id="products-template" type="text/x-jsrender">
        <ul>
            {{for #data}}
            <li>
                <b>{{>#data.Title}}</b>
                <br />
                {{>#data.UnitsInStock}} in stock at {{>#data.UnitPrice}}
            </li> 
            {{/for}}
        </ul> 
    </script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </p>
       
       <%-- <input id="queryButton" type="button" value="Queries" />
        <br />
        <input id="expandButton1" type="button" value="Expand I" />
        <br />
        <input id="expandButton2" type="button" value="Expand II" />
        <br />
        <input id="dataBindingButton" type="button" value="Data Binding" />
        <br />
        <input id="createListButton" type="button" value="Create List" />
        <br />
        <input id="createItemButton" type="button" value="Create Item" />
        <br />
        <input id="updateItemButton" type="button" value="Update Item" />
        <br />
        <input id="proxyButton" type="button" value="Web Proxy" />
        <br />
        <input id="hostButton" type="button" value="Data from Host Web" />
        <br />
        <input id="nextButton" type="button" value="Continuations" />
        <br />--%>
       
       <%-- : <input id="ListTextbox" type="textbox" value="Type something"></input>--%>

    </div>
    <div>
        <a href="../Lists/Products1">Products</a>
        <br />
        <a href="../Lists/Category1">Categories</a>
        <br />
        <input id="createlist1" type="button" value="CreateList1" />
        <br />
        <input id="createlist2" type="button" value="CreateList2" />
        <br />
         <input id="createListButton" type="button" value="CreateList" />
        <br />
        <input id="addcolumnButton" type="button" value="AddColumn" />
        <br />

    </div>
</asp:Content>
