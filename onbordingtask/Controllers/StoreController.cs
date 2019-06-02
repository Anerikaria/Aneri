using onbordingtask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace onbordingtask.Controllers
{
    public class StoreController : Controller
    {
        private SalesEntity db = new SalesEntity();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetStoreData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var Pdata = db.Stores.OrderBy(a => a.Id).ToList();
            return new JsonResult { Data = Pdata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult DeleteStores(int? id)
        {
            Store Store = db.Stores.Find(id);
            db.Stores.Remove(Store);
            db.SaveChanges();
            return new JsonResult { Data = "Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult StoreCount()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var StoreCt = db.Stores;
            return new JsonResult { Data = StoreCt.Count(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult GetStores(int? id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Store Store = db.Stores.Find(id);

            return new JsonResult { Data = Store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [Route("Stores/EditStores")]
        [HttpPost]
        public JsonResult EditStores(Store store)
        {

            var v = db.Stores.Where(a => a.Id == store.Id).FirstOrDefault();
            if (v != null)
            {
                v.Name = store.Name;
                v.Address = store.Address;
            }
            try
            {
                db.SaveChanges();
            }
            catch (Exception e) { return new JsonResult { Data = e, JsonRequestBehavior = JsonRequestBehavior.AllowGet }; }


            return new JsonResult { Data = "Updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [Route("Stores/AddStores")]
        [HttpPost]
        public JsonResult AddStores(Store Store)
        {
            db.Stores.Add(Store);
            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return new JsonResult { Data = e, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }


            return new JsonResult { Data = "Updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

    }
}
