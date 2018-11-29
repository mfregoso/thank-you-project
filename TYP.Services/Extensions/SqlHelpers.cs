using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Services.Extensions
{
    public static class SqlHelpers
    {
        public static string GetSafeString(this SqlDataReader reader, string columnName)
        {
            string value = null;
            object safeValue = reader[columnName];
            if (safeValue != DBNull.Value) { value = (string)safeValue; }
            // EX: string ThankeeEmail = reader.GetSafeString("ThankeeEmail")
            return value;
        }
    }
}
