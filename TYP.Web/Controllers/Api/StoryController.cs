﻿using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TYP.Models.Domain;
using TYP.Models.Requests;
using TYP.Models.Responses;
using TYP.Services.Interfaces;

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

        [Route("test"), HttpGet]
        public HttpResponseMessage TestStuff()
        {
            string siteURL = ConfigurationManager.AppSettings["SiteUrlOrigin"];
            //SendGridService.Main();

            return Request.CreateResponse(HttpStatusCode.OK, siteURL);
        }

        [Route("search"), HttpGet]
        public HttpResponseMessage StoriesFullTextSearch(string Query = null, int Index = 0, int Size = 30)
        {
            if (Query == null) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Search term is empty!");

            List<StorySnippet> results = storyService.FullTextSearch(Query, Index, Size);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemsResponse<StorySnippet> { Items = results });
        }

        [Route("latest"), HttpGet]
        public HttpResponseMessage GetLatestStoriesPaged(int Index = 0, int Size = 10)
        {
            ItemsResponse<StorySnippet> stories = new ItemsResponse<StorySnippet>();

            List<StorySnippet> latest = storyService.GetLatestStories(Index, Size);
            stories.Items = latest;

            return Request.CreateResponse(HttpStatusCode.OK, stories);
        }

        [Route, HttpGet]
        public HttpResponseMessage GetByLocation(string Lat, string Lng, int Radius)
        {
            ItemsResponse<Story> stories = new ItemsResponse<Story>();

            List<Story> allStories = storyService.GetNearbyStories(Lat, Lng, Radius);
            stories.Items = allStories;

            return Request.CreateResponse(HttpStatusCode.OK, stories);
        }

        [Route("{Id:int}"), HttpGet]
        public HttpResponseMessage GetById(int Id)
        {
            Story story = storyService.GetById(Id);
            if (story.Id.HasValue)
            {
                return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Story> { Item = story });                
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<string> { Item = null });
            }
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
        public HttpResponseMessage UpdateStory(UpdateStory update, int Id)
        {
            if (update == null)
            {
                ModelState.AddModelError("", "No data supplied!");
            } else if (update.Id != Id)
            {
                ModelState.AddModelError("", "URL ID and Body ID do not match!");
            } else if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            storyService.UpdateStory(update);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [Route("{Id:int}"), HttpDelete]
        public HttpResponseMessage DeleteStory(int Id)
        {
            storyService.DeleteStory(Id);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }       
    }
}
