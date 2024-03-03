using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assessment.Domain.Entities;

namespace Assessment.Application.Freelancers.Dto;
public class FreelancerDto
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? PhoneNo { get; set; }
    public List<string> SkillSets { get; set; } = new List<string>();
    public string? Hobby { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Freelancer, FreelancerDto>()
            .ForMember(dest => dest.SkillSets, opt => opt.MapFrom(src => MapSkillSets(src.SkillSets)));
        }

        private static List<string> MapSkillSets(string? skillSets)
        {
            return string.IsNullOrEmpty(skillSets) ? new List<string>() : skillSets.Split(';').ToList();
        }
    }
}
