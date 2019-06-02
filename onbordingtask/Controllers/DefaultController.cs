using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using onbordingtask.Models;


namespace onbordingtask.Controllers
{
    public class DefaultController : Controller
    {
        private OnboardEntities db = new OnboardEntities();

        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCustomer(int? id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Customer Customer = db.Customers.Find(id);

            return new JsonResult { Data = Customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [Route("Customer/EditCustomer")]
        [HttpPost]
        public JsonResult EditCustomer(Customer customer)
        {
            var v = db.Customers.Where(a => a.Id == customer.Id).FirstOrDefault();
            if (v != null)
            {
                v.CustomerName = customer.CustomerName;
                v.CustomerAddress = customer.CustomerName;
            }
            try
            {
                db.SaveChanges();
            }
            catch (Exception e) { return new JsonResult { Data = e, JsonRequestBehavior = JsonRequestBehavior.AllowGet }; }


            return new JsonResult { Data = "Updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [Route("Customer/AddCustomer")]
        [HttpPost]
        public JsonResult AddCustomer(Customer customer)
        {
            db.Customers.Add(customer);
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