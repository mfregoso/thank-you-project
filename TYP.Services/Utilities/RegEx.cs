using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace TYP.Services.Utilities
{
    public class RegEx
    {
        public static string GetSlugUrl(string ThankeeName, int StoryId)
        {
            // credit: https://stackoverflow.com/posts/14538799/revisions
            ThankeeName = ThankeeName.ToLowerInvariant();

            //Remove all accents
            var bytes = Encoding.GetEncoding("Cyrillic").GetBytes(ThankeeName);
            ThankeeName = Encoding.ASCII.GetString(bytes);

            //Replace spaces
            ThankeeName = Regex.Replace(ThankeeName, @"\s", "-", RegexOptions.Compiled);

            //Remove invalid chars
            ThankeeName = Regex.Replace(ThankeeName, @"[^a-z0-9\s-_]", "", RegexOptions.Compiled);

            //Trim dashes from end
            ThankeeName = ThankeeName.Trim('-', '_');

            //Replace double occurences of - or _
            ThankeeName = Regex.Replace(ThankeeName, @"([-_]){2,}", "$1", RegexOptions.Compiled);

            string slug = "thank-you-" + ThankeeName + "-" + StoryId.ToString();
            string storyUrl = "https://thankyouproject.azurewebsites.net/view/" + slug;

            return storyUrl;
        }
    }
}
