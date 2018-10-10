<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Login.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            font-weight: bold;
            font-size: x-large;
        }
        .auto-style5 {
            width: 55px;
        }
        .auto-style9 {
            width: 55px;
            font-size: x-large;
        }
        .auto-style10 {
            font-size: x-large;
        }
        .auto-style11 {
            width: 55px;
            font-size: x-large;
            height: 37px;
        }
        .auto-style12 {
            height: 37px;
        }
        .auto-style13 {
            font-size: x-large;
            height: 31px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table class="auto-style1">
                <tr>
                    <td class="auto-style10" colspan="3">Enter the URL to your Share Point List:</td>
                </tr>
                <tr>
                    <td class="auto-style12" colspan="3">
                        <asp:TextBox ID="txtURL" runat="server" CssClass="auto-style10" Width="809px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style13" colspan="2">Credentials:</td>
                    <td rowspan="4"></td>
                </tr>
                <tr>
                    <td class="auto-style11">UserName</td>
                    <td class="auto-style12">
                        <asp:TextBox ID="txtUserName" runat="server" CssClass="auto-style10" Width="300px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style9">Password</td>
                    <td>
                        <asp:TextBox ID="txtPassword" runat="server" CssClass="auto-style10" ValidateRequestMode="Enabled" Width="302px" TextMode="Password"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style10" colspan="2">&nbsp;</td>
                </tr>
                <tr>
                    <td class="auto-style5">&nbsp;</td>
                    <td><strong>
                        <asp:Button ID="connect" runat="server" CssClass="auto-style2" Height="38px" OnClick="Button1_Click" Text="Connect" Width="161px" />
                        &nbsp;</strong><asp:Label ID="displaylbl" runat="server" Text="   "></asp:Label>
                    </td>
                    <td><strong>
                        <asp:Button ID="cancel" runat="server" CssClass="auto-style2" Height="38px" Text="Cancel" Width="161px" OnClick="cancel_Click" />
                        </strong></td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
