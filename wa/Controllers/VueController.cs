using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class VueController : ApiController
    {
        // GET: api/Vue
        public ControllerReturn Get(string id)
        {
            ControllerReturn ret = new ControllerReturn();

            ret.Data = Items.GetList();
            ret.Success = true;

            return ret;
        }

        // GET: api/Vue/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Vue
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Vue/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Vue/5
        public void Delete(int id)
        {
        }
    }
}
