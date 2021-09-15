using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.CloadStorageService
{
    public interface ICloudService
    {
        Task<string> UploadFileAsync(string fileName,byte[] pdfAsByteArray);
    }
}
