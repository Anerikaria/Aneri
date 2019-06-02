using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using onbordingtask.Models;
using Newtonsoft.Json;

namespace onbordingtask.Controllers
{
    public class ProductController : Controller
    {
        private SalesEntity db = new SalesEntity();
        // GET: Poduct

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProdata()
        {
            {
                db.Configuration.ProxyCreationEnabled = false;
                var productList = db.Products.OrderBy(p => p.Id).ToList();
                return Json(productList, JsonRequestBehavior.AllowGet);


            }
        }

        //Get Create 
        public JsonResult GetProduct(int? id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Product product = db.Products.Find(id);

            return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        [HttpPost]
        public ActionResult CreateProduct(Product pro)
        {
            db.Products.Add(pro);
            try
            {
                db.SaveChanges();
            }
            catch (Exception error)
            {
                return new JsonResult { Data = error, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

            return new JsonResult { Data = "Added", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public JsonResult EditProduct(Product product)
        {
            var p = db.Products.Where(k => k.Id == product.Id).FirstOrDefault();
            if (p != null)
            {
                p.Name = product.Name;
                p.Price = product.Price;
            }
            try
            {
                db.SaveChanges();
            }
            catch (Exception e) { return new JsonResult { Data = e, JsonRequestBehavior = JsonRequestBehavior.AllowGet }; }


            return new JsonResult { Data = "Updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult DeleteProduct(int? Id)
        {
            Product product = db.Products.Find(Id);
            db.Products.Remove(product);
            db.SaveChanges();
            return new JsonResult { Data = "Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult ProductCount()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var pro = db.Products;
            return new JsonResult { Data = pro.Count(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}


    

