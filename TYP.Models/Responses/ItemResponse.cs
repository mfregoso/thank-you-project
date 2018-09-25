using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TYP.Models.Domain;

namespace TYP.Models.Responses
{
    public class ItemResponse<T>
    {
        public bool IsSuccessful = true;
        public Guid TransactionId = Guid.NewGuid();
        public T Item { get; set; }
    }
}
