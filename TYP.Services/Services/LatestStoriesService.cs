using Microsoft.AspNet.SignalR;
using TYP.Models.Domain;
using TYP.Models.Requests;
using TYP.Services.SignalR;

namespace TYP.Services.Services
{
    public class LatestStoriesService
    {
        public static void SendNewStory(CreateStory newStory, int storyId)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<StoryHub>();
            if (hubContext != null)
            {
                StorySnippet newSnippet = new StorySnippet()
                {
                    Id = storyId,
                    ThankeeName = newStory.ThankeeName,
                    Location = newStory.Location,
                    PosterName = newStory.PosterName
                };
                hubContext.Clients.All.updateFromServer(newSnippet);
            }
        }
    }
}
