using Microsoft.AspNetCore.SignalR;

namespace SignalRTest.SignalR
{
    public class SignalHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("SignalPush", user + ": " + message);
        }
    }
}
