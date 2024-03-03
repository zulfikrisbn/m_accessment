using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assessment.Application.Common.Interfaces;
using Assessment.Application.Freelancers.Dto;
using Assessment.Domain.Entities;

namespace Assessment.Application.Freelancers.Commands;
public class CreateFreelancerCommand : IRequest<bool>
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? PhoneNo { get; set; }
    public List<string> SkillSets { get; set; } = new List<string>();
    public string? Hobby { get; set; }
}

public class CreateFreelancerCommandHandler : IRequestHandler<CreateFreelancerCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreateFreelancerCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> Handle(CreateFreelancerCommand request, CancellationToken cancellationToken)
    {
        var entity = new Freelancer
        {
            Username = request.Username,
            Email = request.Email,
            PhoneNo = request.PhoneNo,
            Hobby = request.Hobby,
            SkillSets = string.Join(";", request.SkillSets)
        };

        _context.Freelancers.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
