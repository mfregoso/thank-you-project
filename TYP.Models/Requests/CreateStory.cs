using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Models.Requests
{
    public class CreateStory
    {
        [Required]
        public string Description { get; set; }
        public DateTime? PublishDate { get; set; }
        public DateTime? EventDate { get; set; }
        [Required]
        public string PosterName { get; set; }
        public string ThankeeName { get; set; }
        public string LocationName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
