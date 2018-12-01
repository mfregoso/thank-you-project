using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Services.SignalR
{
    public class StoryHub : Hub
    {
        public void NotifyAllUsers(string message)
        {
            Clients.All.UsersMsgReceipt(message);
        }

        public override Task OnConnected()
        {
            System.Diagnostics.Debug.WriteLine("SignalR Connection!");
            return base.OnConnected();
        }
    }
}
