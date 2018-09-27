using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TYP.Models.Domain;
using TYP.Models.Requests;
using TYP.Models.Responses;
using TYP.Services.Interfaces;
using TYP.Services.Services;

namespace TYP.Web.Controllers.Api

{
    [RoutePrefix("api/stories")]
    public class StoryController : ApiController
    {
        readonly IStoryService storyService;
        public StoryController(IStoryService storyService)
        {
            this.storyService = storyService;
        }
        //StoryService service = new StoryService();
        
        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            ItemsResponse<Story> items = new ItemsResponse<Story>();
            //List < Story > stories = new List<Story>();

            List<Story> allStories = storyService.GetAll();
            items.Items = allStories;

            return Request.CreateResponse(HttpStatusCode.OK, items);
        }

        [Route("{Id:int}"), HttpGet]
        public HttpResponseMessage GetById(int Id)
        {
            Story story = storyService.GetById(Id);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Story> { Item = story });
        }

        [Route, HttpPost]
        public HttpResponseMessage PostStory(CreateStory request)
        {
            if (request == null)
            {
                ModelState.AddModelError("", "No data supplied!");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            
            int id = storyService.CreateStory(request);
            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = id } );
        }

        [Route("{Id:int}"), HttpPut]
        public HttpResponseMessage UpdateStory(int Id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "You updated ID: " + Id.ToString());
        }

        [Route("{Id:int}"), HttpDelete]
        public HttpResponseMessage DeleteStory(int Id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "You just deleted ID: " + Id.ToString());
        }       
    }
}
