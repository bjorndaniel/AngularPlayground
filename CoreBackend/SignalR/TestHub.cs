using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace CoreBackend.SignalR
{
    public class TestHub : Hub
    {
        public Task Send(string data) => 
            Clients.All.InvokeAsync("Send", data);
    }
}