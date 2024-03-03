using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.Domain.Entities;
public class Freelancer
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? PhoneNo { get; set; }
    public string? SkillSets { get; set; }
    public string? Hobby { get; set; }
}
