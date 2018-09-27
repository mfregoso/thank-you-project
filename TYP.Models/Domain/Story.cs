using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Models.Domain
{
    public class Story
    {
        public int? Id { get; set; }
        public string Description { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime StoryDate { get; set; }
        public string PosterName { get; set; }
        public string ThankeeName { get; set; }
        public string ThankeeEmail { get; set; }
        public string Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
