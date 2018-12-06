using System;
using System.Data;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TYP.Models.Domain;
using TYP.Services.Interfaces;
using TYP.Models.Requests;
using TYP.Services.Extensions;

namespace TYP.Services.Services
{
    public class StoryService : IStoryService
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["MyDb"].ConnectionString;
        private readonly int MAX_DISTANCE_MILES = 20;

        public List<StorySnippet> GetLatestStories(int Index, int PageSize)
        {
            const int MAX_PAGESIZE = 30;
            List<StorySnippet> latest = new List<StorySnippet>();

            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_SelectNewestPaged";
                    cmd.Parameters.AddWithValue("@Index", Index);
                    cmd.Parameters.AddWithValue("@PageSize", Math.Min(PageSize, MAX_PAGESIZE));

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        StorySnippet story = new StorySnippet()
                        {
                            Id = (int)reader["Id"],
                            PosterName = (string)reader["PosterName"],
                            ThankeeName = (string)reader["ThankeeName"],
                            Location = (string)reader["Location"]
                        };
                        latest.Add(story);
                    };
                }
            }

            return latest;
        }

        public List<StorySnippet> FullTextSearch(string Query, int Index, int PageSize)
        {
            const int MAX_PAGESIZE = 30;
            List<StorySnippet> results = new List<StorySnippet>();

            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_FTSearch";
                    cmd.Parameters.AddWithValue("@Query", Query);
                    cmd.Parameters.AddWithValue("@Index", Index);
                    cmd.Parameters.AddWithValue("@PageSize", Math.Min(PageSize, MAX_PAGESIZE));

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        StorySnippet story = new StorySnippet()
                        {
                            Id = (int)reader["Id"],
                            PosterName = (string)reader["PosterName"],
                            ThankeeName = (string)reader["ThankeeName"],
                            Location = (string)reader["Location"]
                        };
                        results.Add(story);
                    };
                }
            }

            return results;
        }

        public List<Story> GetNearbyStories(string Lat, string Lng, int Radius)
        {
            List<Story> stories = new List<Story>();
            int MaxRadius = Math.Min(MAX_DISTANCE_MILES, Radius);

            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_SelectNearby";
                    cmd.Parameters.AddWithValue("@Lat", Lat);
                    cmd.Parameters.AddWithValue("@Long", Lng);
                    cmd.Parameters.AddWithValue("@Radius", MaxRadius * 1600);

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Story story = new Story()
                        {
                            Id = (int)reader["Id"],
                            PosterName = (string)reader["PosterName"],
                            Description = (string)reader["Description"],
                            ThankeeName = (string)reader["ThankeeName"],
                            Location = (string)reader["Location"],
                            Latitude = (double)reader["Latitude"],
                            Longitude = (double)reader["Longitude"],
                            StoryDate = (DateTime)reader["StoryDate"],
                            PublishDate = (DateTime)reader["PublishDate"]
                        };
                        stories.Add(story);
                    };
                }
            }
            return stories;
        }

        public Story GetById(int Id)
        {
            Story story = new Story();
            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_SelectById";
                    cmd.Parameters.AddWithValue("@Id", Id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        story.Id = (int)reader["Id"];
                        story.PosterName = (string)reader["PosterName"];
                        story.Description = (string)reader["Description"];
                        story.ThankeeName = (string)reader["ThankeeName"];
                        story.Location = (string)reader["Location"];
                        story.Latitude = (double)reader["Latitude"];
                        story.Longitude = (double)reader["Longitude"];
                        story.StoryDate = (DateTime)reader["StoryDate"];
                        story.PublishDate = (DateTime)reader["PublishDate"];                        
                     };
                }
            }
            return story;
        }

        public int CreateStory(CreateStory story)
        {
            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_Insert";

                    cmd.Parameters.AddWithValue("@ThankeeName", story.ThankeeName);
                    cmd.Parameters.AddWithValue("@Description", story.Description);
                    cmd.Parameters.AddWithValue("@Location", story.Location);
                    cmd.Parameters.AddWithValue("@StoryDate", story.StoryDate);
                    cmd.Parameters.AddWithValue("@PosterName", story.PosterName);
                    cmd.Parameters.AddWithValue("@PublishDate", story.PublishDate);
                    cmd.Parameters.AddWithValue("@Latitude", story.Latitude);
                    cmd.Parameters.AddWithValue("@Longitude", story.Longitude);
                    cmd.Parameters.AddWithValue("@ThankeeEmail", story.ThankeeEmail);
                    cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;                    

                    cmd.ExecuteNonQuery();

                    int storyId = (int)cmd.Parameters["@Id"].Value;

                    Task.Run(() => LatestStoriesService.SendNewStory(story, storyId));

                    if (story.ThankeeEmail != null)
                    {
                        Task.Run(async() =>
                        {
                            await SendGridService.NotifyRecipient(story.ThankeeEmail, story.ThankeeName, story.PosterName, storyId);
                        });
                    }

                    return storyId;
                }
            }            
        }

        public void UpdateStory(UpdateStory story)
        {
            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_Update";

                    cmd.Parameters.AddWithValue("@Id", story.Id);
                    cmd.Parameters.AddWithValue("@ThankeeName", story.ThankeeName);
                    cmd.Parameters.AddWithValue("@Description", story.Description);
                    cmd.Parameters.AddWithValue("@Location", story.Location);
                    cmd.Parameters.AddWithValue("@StoryDate", story.StoryDate);
                    cmd.Parameters.AddWithValue("@PosterName", story.PosterName);
                    cmd.Parameters.AddWithValue("@PublishDate", story.PublishDate);
                    cmd.Parameters.AddWithValue("@Latitude", story.Latitude);
                    cmd.Parameters.AddWithValue("@Longitude", story.Longitude);
                    //cmd.Parameters.AddWithValue("@ThankeeEmail", story.ThankeeEmail); // need to re-enable in stored procedure
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteStory(int Id)
        {
            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_Delete";
                    cmd.Parameters.AddWithValue("@Id", Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
