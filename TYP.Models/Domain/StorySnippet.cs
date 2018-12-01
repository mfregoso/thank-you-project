using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Models.Domain
{
    public class StorySnippet
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("posterName")]
        public string PosterName { get; set; }
        [JsonProperty("thankeeName")]
        public string ThankeeName { get; set; }
        [JsonProperty("location")]
        public string Location { get; set; }
    }
}
