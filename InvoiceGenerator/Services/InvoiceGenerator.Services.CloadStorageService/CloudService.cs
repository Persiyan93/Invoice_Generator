using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.CloadStorageService
{
    public class CloudService : ICloudService
    {
        private readonly BlobServiceClient blobServiceClient;
        public CloudService(string connectionString)
        {
            this.blobServiceClient = new BlobServiceClient(connectionString);
        }
        public async  Task<string> UploadFileAsync( string fileName,byte[] pdfAsByteArray)
        {
            var clientContainer = blobServiceClient.GetBlobContainerClient("invoices");
            using (var pdfAsMemoryStream=new MemoryStream(pdfAsByteArray))
            {
                var existBlob = clientContainer.GetBlobClient(fileName+".pdf");
                if (existBlob!=null)
                {
                    await existBlob.UploadAsync(pdfAsMemoryStream, overwrite: true);
                }
                else
                {
                    await clientContainer.UploadBlobAsync(fileName + ".pdf", pdfAsMemoryStream);

                }

                
                
            }
            var blob = clientContainer.GetBlobClient(fileName);
            var url = blob.Uri.AbsoluteUri;

            return url;
          
          
        }
    }
}
