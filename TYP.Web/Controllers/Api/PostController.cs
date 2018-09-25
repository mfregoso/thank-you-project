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
    public class PostController : ApiController
    {
        readonly IStoryService storyService;
        public PostController(IStoryService storyService)
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

            //Story s1 = new Story
            //{
            //    Id = 1,
            //    Description = "Hello world",
            //    PosterName = "Master Hacker"
            //};
            //stories.Add(s1);
            //Story s2 = new Story
            //{
            //    Id = 4,
            //    Description = "Great day",
            //    PosterName = "Joanna"
            //};
            //stories.Add(s2);
            items.Items = allStories;

            return Request.CreateResponse(HttpStatusCode.OK, items);
        }

        [Route("{Id:int}"), HttpGet]
        public HttpResponseMessage GetById(int Id)
        {
            ItemResponse<Story> item = new ItemResponse<Story> {
                Item = new Story
                {
                    Id = Id,
                    Description = "Hello world",
                    PosterName = "Master Hacker"
                }
            };
            return Request.CreateResponse(HttpStatusCode.OK, item);
        }

        [Route, HttpPost]
        public HttpResponseMessage PostStory(CreateStory request)
        {
            ItemResponse<Story> response = new ItemResponse<Story>();
            Story newStory = new Story
            {
                Description = request.Description,
                PosterName = request.PosterName
            };
            response.Item = newStory;
            return Request.CreateResponse(HttpStatusCode.OK, response);
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

        // GET: api/Post
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Post/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Post
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Post/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Post/5
        public void Delete(int id)
        {
        }
    }
}
