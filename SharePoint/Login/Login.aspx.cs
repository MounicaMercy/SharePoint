using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DAL;
namespace Login
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string UserName= txtUserName.Text;
       
            SecureString Password = new SecureString();
            foreach (char c in txtPassword.Text)
            {
                Password.AppendChar(c);
            }
            string Url = txtURL.Text;

            DAL.DAL ConnectionObj = new DAL.DAL();
            ConnectionObj.Connection(UserName,Password,Url);
           // displaylbl.Text = "Items Inserted";
           
        }

        
    }
}