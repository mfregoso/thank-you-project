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

namespace TYP.Services.Services
{
    //private readonly object connectionString = ConfigurationManager.ConnectionStrings["MyDb"].ConnectionString;
    public class StoryService : IStoryService
    {
        readonly string connectionString = ConfigurationManager.ConnectionStrings["MyDb"].ConnectionString;

        public List<Story> GetAll()
        {
            List<Story> stories = new List<Story>();
            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                sql.Open();
                using (SqlCommand cmd = sql.CreateCommand())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "Story_SelectAll";
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Story thx = new Story()
                        {
                            Id = (int)reader["Id"],
                            PosterName = (string)reader["PosterName"],
                            Description = (string)reader["Description"],
                            ThankeeName = (string)reader["ThankeeName"]
                        };
                        stories.Add(thx);
                    }
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
                        object thankeeEmail = reader["ThankeeEmail"]; // catch possible DBNull.Value from SQL
                        if (thankeeEmail != DBNull.Value)
                        {
                            story.ThankeeEmail = (string)thankeeEmail; 
                        }
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
                    cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;                    

                    cmd.ExecuteNonQuery();

                    int storyId = (int)cmd.Parameters["@Id"].Value;
                    return storyId;
                }
            }            
        }
    }
}
