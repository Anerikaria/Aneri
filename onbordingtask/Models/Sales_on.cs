namespace onbordingtask.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Sales_on
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }

        [ForeignKey("CustomerId")]
        [Required(ErrorMessage ="Please Select Customer")]
        public int CustomerId { get; set; }

        [ForeignKey("ProductId")]
        [Required(ErrorMessage ="Please Select Product")]
        public int ProductId { get; set; }
        public int StoreId { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public System.DateTime DateSold { get; set; }
        [Display(Name = "Date Of Sold")]

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
