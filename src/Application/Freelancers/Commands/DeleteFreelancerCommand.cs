using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assessment.Application.Common.Interfaces;

namespace Assessment.Application.Freelancers.Commands;
public record DeleteFreelancerCommand(int Id) : IRequest;

public class DeleteFreelancerCommandHandler : IRequestHandler<DeleteFreelancerCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteFreelancerCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteFreelancerCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Freelancers
            .Where(x => x.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Freelancers.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
