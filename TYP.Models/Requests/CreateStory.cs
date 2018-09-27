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
        [Required, MaxLength(3000)]
        public string Description { get; set; }
        [Required]
        public string PublishDate { get; set; }
        [Required]
        public string StoryDate { get; set; }
        [Required, MaxLength(100)]
        public string PosterName { get; set; }
        [Required, MaxLength(100)]
        public string ThankeeName { get; set; }
        [MaxLength(100)]
        public string ThankeeEmail { get; set; }
        [Required, MaxLength(100)]
        public string Location { get; set; }
        [Required, MaxLength(30)]
        public string Latitude { get; set; }
        [Required, MaxLength(30)]
        public string Longitude { get; set; }
    }
}
