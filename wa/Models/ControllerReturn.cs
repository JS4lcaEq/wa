using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    [Serializable]
    public class ControllerReturn
    {
        private bool success;

        public bool Success { get => success; set => success = value; }
        public object Data { get => data; set => data = value; }

        private object data;

    }
}