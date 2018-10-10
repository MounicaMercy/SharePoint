using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DAL
    {
        public void Connection(string UserName, SecureString Password,string Url)
        {
            using (var clientcontext = new ClientContext(Url))
            {
                clientcontext.Credentials = new SharePointOnlineCredentials(UserName, Password);
                Web web = clientcontext.Web;
                ////ListCreationInformation createlist = new ListCreationInformation();
                ////createlist.Title = "My List";
                ////createlist.Description = "My Custom List";
                //////choose a template as Generic List.  
                ////createlist.TemplateType = (int)ListTemplateType.GenericList;
                //////add list to SharePoint  
                ////web.Lists.Add(createlist);
                ////Console.WriteLine("List Created");
                //List list = web.Lists.GetByTitle("My List");
                //ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                //ListItem listitem = list.AddItem(itemCreateInfo);
                //listitem["Title"] = "Hello";
                //listitem.Update();
                //Console.WriteLine("Items Inserted");
                clientcontext.Load(web.Lists, lists => lists.Include(listname => listname.Title));
                clientcontext.ExecuteQuery();
                foreach (List list in web.Lists)
                {
                    
                    Console.WriteLine(list.Title);
                }
                Console.ReadKey();

            }
        }
        
    }
}
