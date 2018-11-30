using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace TYP.Services.Services
{
    public class SendGridService
    {
        public static void Main()
        {
            Execute().Wait();
        }

        static async Task Execute()
        {
            var apiKey = ApiKeys.SendGrid();
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("typ@mfregoso.com", "TYP Dev");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("m4goso@gmail.com", "MF");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task<Response> NotifyRecipient(string ThankeeEmail, string ThankeeName, string PosterName, int StoryId)
        {
            string test = "hello you " + StoryId.ToString();
            string newt = test.ToLower().Replace(" ", "-");

            var apiKey = ApiKeys.SendGrid();
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("noreply@thank-you-project.com", "Thank You Project");
            var subject = "You have a Thank You Story from " + PosterName;
            var to = new EmailAddress(ThankeeEmail, ThankeeName);
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }
    }
}
