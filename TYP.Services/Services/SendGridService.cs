﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using TYP.Services.Utilities;

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
            var from = new EmailAddress("noreply@oktest.com", "TYP Dev");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("recipient@email.com", "MF");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public static async Task<Response> NotifyRecipient(string ThankeeEmail, string ThankeeName, string PosterName, int StoryId)
        {
            string storyUrl = RegEx.GetSlugUrl(ThankeeName, StoryId);

            var apiKey = ApiKeys.SendGrid();
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("no-reply@thankyouproject.azurewebsites.net", "Thank You Project");
            var subject = "You have a Thank You Story from " + PosterName;
            var to = new EmailAddress(ThankeeEmail, ThankeeName);
            var plainTextContent = "Read all abou it here: " + storyUrl;
            var htmlContent = "Read all about it here: " + "<a href='" + storyUrl + "'>" + storyUrl + "</a>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }
    }
}
