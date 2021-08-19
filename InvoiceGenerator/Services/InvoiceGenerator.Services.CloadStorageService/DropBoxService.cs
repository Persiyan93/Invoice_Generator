
using Dropbox.Api;
using Dropbox.Api.Files;
using System;
using System.IO;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.CloadStorageService
{
    public class DropBoxService : IDropBoxService
    {
        private readonly DropboxClient client;

        public DropBoxService(string apiKey)
        {
            this.client = new DropboxClient(apiKey);
        }

        public async Task<string> UploadFileAsync(string folder, string fileName, string fileUri)
        {
            try
            {
                using (var mem = new FileStream(fileUri, FileMode.Open, FileAccess.Read))
                {
                    var full = this.client.Users.GetCurrentAccountAsync();
                    FileMetadata updated = await this.client.Files.UploadAsync(
                        "/"+folder + "/" + fileName,
                        WriteMode.Overwrite.Instance,
                        body: mem);


                    var arg1 = new Dropbox.Api.Sharing.CreateSharedLinkWithSettingsArg("/"+folder + "/" + fileName);
                    var share = await this.client.Sharing.CreateSharedLinkWithSettingsAsync(arg1);
                    return share.Url;
                }
            }
            catch (Exception e)
            {

                Console.Write(e);
                throw;
            }
       
           
        }

    }
}
