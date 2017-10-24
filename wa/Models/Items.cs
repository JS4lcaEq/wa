using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    [Serializable]
    public class Items
    {


        public string Id { get => id; set => id = value; }
        public string Idp { get => idp; set => idp = value; }
        public string Nm { get => nm; set => nm = value; }

        private string id;
        private string idp;
        private string nm;

        public static List<Items> GetList(int count = 10, string idp = null)
        {
            List<Items> list = new List<Items>();

            for(int i = 0; i < count; i++)
            {
                list.Add(new Items { Id = idp + i, Idp = idp, Nm = String.Format("Name {0}", i) });
            }

            return list;
        }

    }
}