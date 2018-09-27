using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TYP.Models.Responses
{
    public class SuccessResponse
    {
        public bool IsSuccessful = true;
        public Guid TransactionId = Guid.NewGuid();
    }
}
