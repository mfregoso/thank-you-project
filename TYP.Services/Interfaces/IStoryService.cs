using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TYP.Models.Domain;

namespace TYP.Services.Interfaces
{
    public interface IStoryService
    {
        List<Story> GetAll();

    }
}
