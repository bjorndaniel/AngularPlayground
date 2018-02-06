using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CoreBackend.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CoreBackend.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        private readonly IHubContext<TestHub> _hubContext;

        public FilesController(IHubContext<TestHub> hubContext)
        {
            _hubContext = hubContext;
        }
        
        [HttpGet]
        [Route("pdf")]
        public async Task<ActionResult> Pdf()
        {
            await _hubContext.Clients.All.InvokeAsync("Send", "Get pdf request");
            var file = new FileInfo("Test.pdf");
            var data = new byte[file.Length];
            using (var stream = file.Open(FileMode.Open))
            {
               await stream.ReadAsync(data, 0, data.Length);
            }
            return File(data, "application/pdf", file.Name);
        }

        [HttpGet]
        [Route("excel")]
        public async Task<ActionResult> Excel()
        {
            await _hubContext.Clients.All.InvokeAsync("Send", "Get excel request");
            var file = new FileInfo("Book1.xlsx");
            var data = new byte[file.Length];
            using (var stream = file.Open(FileMode.Open))
            {
                await stream.ReadAsync(data, 0, data.Length);
            }
            return File(data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", file.Name);
        }
    }
}