using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreBackend.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        [HttpGet]
        [Route("pdf")]
        public ActionResult Pdf()
        {
            var file = new FileInfo("Test.pdf");
            var data = new byte[file.Length];
            using (var stream = file.Open(FileMode.Open))
            {
                stream.Read(data, 0, data.Length);
            }
            return File(data, "application/pdf", file.Name);
        }

        [HttpGet]
        [Route("excel")]
        public ActionResult Excel()
        {
            var file = new FileInfo("Book1.xlsx");
            var data = new byte[file.Length];
            using (var stream = file.Open(FileMode.Open))
            {
                stream.Read(data, 0, data.Length);
            }
            return File(data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", file.Name);
        }
    }
}