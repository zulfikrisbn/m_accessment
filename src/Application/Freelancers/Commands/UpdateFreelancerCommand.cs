using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Assessment.Application.Common.Interfaces;

namespace Assessment.Application.Freelancers.Commands;
public class UpdateFreelancerCommand : IRequest
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? PhoneNo { get; set; }
    public List<string> SkillSets { get; set; } = [];
    public string? Hobby { get; set; }
}

public class UpdateFreelancerCommandHandler : IRequestHandler<UpdateFreelancerCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateFreelancerCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateFreelancerCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Freelancers
            .FindAsync([request.Id], cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        entity.Username = request.Username;
        entity.Email = request.Email;
        entity.PhoneNo = request.PhoneNo;
        entity.SkillSets = string.Join(';', request.SkillSets);
        entity.Hobby = request.Hobby;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
