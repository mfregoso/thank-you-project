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
    }
}
