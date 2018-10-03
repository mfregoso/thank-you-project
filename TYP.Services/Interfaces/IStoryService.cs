using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TYP.Models.Domain;
using TYP.Models.Requests;

namespace TYP.Services.Interfaces
{
    public interface IStoryService
    {
        List<Story> GetNearbyStories(string Lat, string Lng, int Radius);
        List<Story> GetAll();
        int CreateStory(CreateStory story);
        Story GetById(int Id);
        void UpdateStory(UpdateStory story);
        void DeleteStory(int Id);
    }
}
