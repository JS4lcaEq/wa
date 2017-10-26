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

        private static int _count = 0;

        public static List<Items> GetList(int count = 10, string idp = null)
        {
            List<Items> list = new List<Items>();

            var maxCount = _count + count;

            for(int i = _count; i < _count + count; i++)
            {
                list.Add(new Items { Id = i.ToString(), Idp = idp, Nm = String.Format("Name {0}", i) });
            }

            _count = maxCount;

            return list;
        }

    }
}