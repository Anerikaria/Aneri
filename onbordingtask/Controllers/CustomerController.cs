using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using onbordingtask.Models;

namespace onbordingtask.Controllers
{
    public class CustomerController : Controller
    {

        private SalesEntity db = new SalesEntity();
        // GET: Customers
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCustomerData()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var Pdata = db.Customers.OrderBy(a => a.Id).ToList();
            return new JsonResult { Data = Pdata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult DeleteCustomer(int? Id)
        {
            Customer Customer = db.Customers.Find(Id);
            db.Customers.Remove(Customer);
            db.SaveChanges();
            return new JsonResult { Data = "Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult CustCount()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var CustCt = db.Customers;
            return new JsonResult { Data = CustCt.Count(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };

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
                v.Name = customer.Name;
                v.Address = customer.Address;
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


            return new JsonResult { Data = "Added", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // GET: Customers/Details/5
    }
}