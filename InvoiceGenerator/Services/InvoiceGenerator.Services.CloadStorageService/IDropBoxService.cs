using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.CloadStorageService
{
    public interface IDropBoxService
    {

        Task<string> UploadFileAsync(string folder,string fileName,string fileUri);
    }
}
