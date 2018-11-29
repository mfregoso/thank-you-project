using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Models.Requests
{
    public class UpdateStory : CreateStory
    {
        [Required]
        public int Id { get; set; }
    }
}
