namespace onbordingtask.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    
    public partial class OnboardEntities : DbContext
    {
        public OnboardEntities()
            : base("name=OnboardEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Sales_on> Sales_on { get; set; }
        public virtual DbSet<Store> Stores { get; set; }
    }
}
